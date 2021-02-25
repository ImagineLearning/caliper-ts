using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Newtonsoft.Json;

namespace CodeGenerator.Types
{
    class TypescriptTypedDictionary : TypescriptClass
    {
        public TypescriptTypedDictionary(Type type, TypescriptClassCollection userTypes) : base(type, userTypes) { }

        protected override Func<string> CreateClassDeclaration()
        {
            Imports = new Dictionary<string, Dictionary<string, object>>();
            var members = new List<string>();
            var properties = Type.GetProperties(BindingFlags.DeclaredOnly | BindingFlags.Instance | BindingFlags.Public);
            foreach (var property in properties)
            {
                var memberName = (property.GetCustomAttribute<JsonPropertyAttribute>()?.PropertyName ?? property.Name).ToCamelCase();
                var memberType = FromType(property.PropertyType, userTypes);
                var isRequired = property.GetCustomAttribute<RequiredAttribute>() != null;

                members.Add($"\t{memberName}{(isRequired ? "" : "?")}: {memberType}");
                IncludeImport(memberType);
            };

            return () => $@"
{FormatImports()}

export interface {Type.Name} {{
{string.Join(";\n", members)}
    [key: string]: any;
}}
";
        }
    }
}