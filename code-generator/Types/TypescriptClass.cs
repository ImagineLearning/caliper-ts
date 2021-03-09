using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Reflection;
using ImsGlobal.Caliper;
using ImsGlobal.Caliper.Entities;
using ImsGlobal.Caliper.Events;
using Newtonsoft.Json;

using Validation = ImsGlobal.Caliper.Validation;

namespace CodeGenerator.Types
{
    class TypescriptClass
    {
        static TypescriptClass CaliperContext { get; } = new TypescriptClass(typeof(string[]), "string[]");

        static CaliperRoleTypescriptClass Role { get; } = new CaliperRoleTypescriptClass();

        protected static Type[] InterfaceTypes { get; } = new[]
        {
            typeof(Event),
            typeof(Entity),
            typeof(SystemIdentifier)
        };

        protected static Type[] NumberTypes { get; } = new[]
        {
            typeof(Grade),
            typeof(short),
            typeof(ushort),
            typeof(int),
            typeof(uint),
            typeof(long),
            typeof(ulong),
            typeof(float),
            typeof(double)
        };

        protected static Type[] StringTypes { get; } = new[]
        {
            typeof(string),
            typeof(Guid),
            typeof(DateTime),
            typeof(DateTimeOffset),
            typeof(TimeZoneInfo),
            typeof(TimeSpan),
            typeof(IPAddress),
            typeof(Uri),
        };

        public static TypescriptClass FromType(Type type, TypescriptClassCollection userTypes)
        {
            if (Nullable.GetUnderlyingType(type) != null)
                return FromType(type.GenericTypeArguments.First(), userTypes);

            if (type == typeof(object))
                return TypescriptPrimitive.Object;

            if (type == typeof(bool)) {
                return TypescriptPrimitive.Boolean;
            }

            if (type == typeof(CaliperContext))
                return CaliperContext;

            if (type == typeof(SystemIdentifier))
                return GetUserTypeDefinition(type, userTypes, () => new SystemIdentifierTypescriptClass(userTypes));

            if (type == typeof(Domain))
                return GetUserTypeDefinition(type, userTypes, () => new DomainTypescriptClass(userTypes));

            if (typeof(Event).IsAssignableFrom(type))
                return GetUserTypeDefinition(type, userTypes, () => new EventTypescriptClass(type, userTypes));

            if (StringTypes.Contains(type))
                return TypescriptPrimitive.String;

            if (NumberTypes.Contains(type))
                return TypescriptPrimitive.Number;

            if (type != typeof(TypedDictionary) && typeof(TypedDictionary).IsAssignableFrom(type))
                return GetUserTypeDefinition(type, userTypes, () => new TypescriptTypedDictionary(type, userTypes));

            if (typeof(IDictionary).IsAssignableFrom(type) || typeof(IDictionary<string, object>).IsAssignableFrom(type))
                return new TypescriptDictionary(type, userTypes);

            if (typeof(IEnumerable).IsAssignableFrom(type))
                return new TypescriptArray(type, userTypes);

            if (type.IsPrimitive)
                return new TypescriptPrimitive(type, type.Name);

            return GetUserTypeDefinition(type, userTypes, () =>
            {
                if (type == typeof(Role))
                    return Role;
                else if (type.IsEnum)
                    return new TypescriptEnum(type);
                else
                    return new TypescriptClass(type, userTypes);
            });
        }

        static TypescriptClass GetUserTypeDefinition(Type type, TypescriptClassCollection userTypes, Func<TypescriptClass> create)
        {
            if (!userTypes.ContainsKey(type))
            {
                TypescriptClass userType = create();
                userTypes[type] = userType;
                userType.Build();
                return userType;
            }

            return userTypes[type];
        }


        protected Func<string> getClassDeclaration;
        protected string name;

        public virtual Type Type { get; protected set; }

        public virtual string Name => InterfaceTypes.FirstOrDefault(_ => _.IsAssignableFrom(Type)) == null ? name : $"I{name}";

        public virtual string ImportName => Name;

        public Dictionary<string, Dictionary<string, object>> Imports { get; protected set; }

        public TypescriptClassCollection SubClasses { get; } = new TypescriptClassCollection();

        public string ClassDeclaration => getClassDeclaration?.Invoke();

        protected TypescriptClassCollection userTypes { get; }


        public TypescriptClass(Type type) : this(type, type.GetTypescriptName()) { }

        protected TypescriptClass(Type type, string name)
        {
            Type = type;
            this.name = name;
        }

        protected TypescriptClass(Type type, TypescriptClassCollection userTypes) : this(type)
        {
            this.userTypes = userTypes;
        }

        protected TypescriptClass() { }

        public override string ToString() => Name;

        public void Build()
        {
            Imports = new Dictionary<string, Dictionary<string, object>>();
            SubClasses.Clear();
            getClassDeclaration = CreateClassDeclaration();
        }

        protected void IncludeImport(TypescriptClass import, IEnumerable<string> additionalImports = null)
        {
            var importType = import.Type;
            if (!importType.Namespace.Contains("Caliper") || importType == Type || importType.DeclaringType == Type)
                return;

            var path = Type.GetRelativeDirectory(importType) + (importType.DeclaringType?.Name ?? importType.Name);
            var types = Imports.ContainsKey(path) ? Imports[path] : Imports[path] = new Dictionary<string, object>();
            types[import.ImportName] = null;

            if (additionalImports != null)
            {
                foreach (var additionalImport in additionalImports)
                    types[additionalImport] = null;
            }
        }

        protected virtual string FormatImports()
        {
            var totalImports = new Dictionary<string, Dictionary<string, object>>(Imports);
            foreach (var subClass in SubClasses.Values)
            {
                if (subClass.Imports == null)
                    continue;

                foreach (var import in subClass.Imports)
                {
                    if (import.Key == $"./{Type.Name}") //subclass was importing from this type
                        continue;

                    var path = import.Key;
                    var types = totalImports.ContainsKey(path) ? totalImports[path] : totalImports[path] = new Dictionary<string, object>();
                    foreach (var key in import.Value.Keys)
                        types[key] = null;
                }
            }

            var caliperImport = "";
            List<(string Key, string Value)> importList = null;
            if (!Type.IsNested)
            {
                var caliperPath = Type.GetRelativeDirectory(typeof(Caliper));
                caliperImport = $"import Caliper, {{ CaliperSettings }} from \"{caliperPath}caliper\";\n";
                importList = totalImports.Select(_ => (Key: _.Key, Value: string.Join(", ", _.Value.Keys))).ToList();
                importList?.Sort((a, b) => string.Compare(a.Key, b.Key));
            }

            return caliperImport + string.Join('\n', importList?.Select(_ => $"import {{{_.Value}}} from \"{_.Key}\";") ?? new string[0]);
        }

        protected virtual Func<string> CreateClassDeclaration()
        {
            var initializers = new Dictionary<string, string>();
            var options = new Dictionary<string, TypescriptProperty>();
            var members = new Dictionary<string, TypescriptProperty>();
            var includeMember = new Action<string, TypescriptClass, bool>((name, @class, required) =>
            {
                var member = members.ContainsKey(name)
                    ? members[name]
                    : members[name] = new TypescriptProperty { Name = name };

                if (required)
                    member.IsRequired = true;

                member.AddType(@class.Name);
                IncludeImport(@class);
            });

            var inheritance = "";
            var baseType = new Type[] { null, typeof(object) }.Contains(Type.BaseType) ? null : Type.BaseType;
            if (baseType != null)
            {
                var baseClass = FromType(baseType, userTypes);
                IncludeImport(baseClass);
                inheritance = $" extends {baseClass}";
            }

            foreach (var constructor in Type.GetConstructors())
            {
                foreach (var parameter in constructor.GetParameters())
                {
                    var parameterName = parameter.GetCustomAttribute<CategoryAttribute>()?.Category ?? parameter.Name.ToCamelCase();
                    var parameterType = FromType(parameter.ParameterType, userTypes);
                    includeMember(parameterName, parameterType, !parameter.HasDefaultValue);

                    if (parameter.HasDefaultValue && (!parameter.DefaultValue?.IsDefault() ?? false))
                        initializers.Add(parameterName, parameter.DefaultValue.ToCodeText());
                }
            }

            var properties = Type.GetProperties();
            var baseProperties = baseType?.GetProperties() ?? new PropertyInfo[0];
            foreach (var property in properties)
            {
                var isRequired = property.GetCustomAttribute<RequiredAttribute>() != null;
                var memberName = (property.GetCustomAttribute<JsonPropertyAttribute>()?.PropertyName ?? property.Name).ToCamelCase();
                var memberType = FromType(property.PropertyType, userTypes);
                var validTypesAttribute = property.GetCustomAttribute<Validation.ValidTypesAttribute>();
                if (validTypesAttribute != null)
                {
                    var validTypes = validTypesAttribute.Types;
                    bool isArray = validTypesAttribute is Validation.ValidElementTypes;
                    if (isArray)
                    {

                    }

                    foreach (var validType in validTypes)
                    {
                        var type = isArray ? typeof(List<>).MakeGenericType(validType) : validType;
                        includeMember(memberName, FromType(type, userTypes), isRequired);
                    }
                }

                var defaultValue = property.GetCustomAttribute<Validation.ConstantAttribute>()?.Value;
                if (defaultValue == null && !Type.IsAbstract)
                {
                    try
                    {
                        var instance = Activator.CreateInstance(Type, true);
                        defaultValue = property.GetValue(instance);
                    }
                    catch (Exception) { }
                }

                var inheritedProperty = baseProperties.FirstOrDefault(_ => _.Name == property.Name && _.PropertyType == property.PropertyType);
                if (inheritedProperty == null)
                {
                    includeMember(memberName, memberType, isRequired);
                }

                IncludeImport(memberType);
                if (!defaultValue?.IsDefault() ?? false)
                {
                    initializers.Add(memberName, defaultValue.ToCodeText());
                }
                else if (!members.ContainsKey(memberName))
                {
                    var optionType = memberType.Name;
                    var option = options.ContainsKey(memberName)
                        ? options[memberName]
                        : options[memberName] = new TypescriptProperty { Name = memberName };
                    option.AddType(optionType);
                }
            }

            options = members
                .Select(member =>
                {
                    var clone = member.Value.Clone();
                    if (initializers.ContainsKey(clone.Name))
                        clone.IsRequired = false;

                    return clone;
                })
                .Union(options.Select(option => option.Value))
                .ToDictionary(item => item.Name, item => item);

            return CreateClassDeclarationBuilder(inheritance, initializers, options, members);
        }

        protected virtual Func<string> CreateClassDeclarationBuilder
        (
            string inheritance,
            Dictionary<string, string> initializers,
            Dictionary<string, TypescriptProperty> options,
            Dictionary<string, TypescriptProperty> members
        )
        {
            return () => $@"
{FormatImports()}

export interface {Name}{inheritance} {{
{string.Join('\n', members.Values.Select(member => $"\t{member};"))}
}}

{(!initializers.Any() || Type.IsAbstract ? "" : $@"
export interface I{Type.GetTypescriptName()}Params {{
{string.Join('\n', options.Values.Select(option => $"\t{option};"))}
}}

export function {Type.FullName.Split('.').Last().Replace("+", "_")}(params: I{Type.GetTypescriptName()}Params) : {Name} {{
    return {{
        {string.Join(",\n\t\t", initializers.Select(_ => $"{_.Key}: {_.Value}"))},
        ...params
    }};
}}
")}

{string.Join("\n\n", SubClasses.Select(_ => _.Value.ClassDeclaration))}
";
        }
    }
}