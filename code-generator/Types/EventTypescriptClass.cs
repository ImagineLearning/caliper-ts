using System;
using System.Collections.Generic;
using System.Linq;
using ImsGlobal.Caliper.Events;
using ImsGlobal.Caliper.Validation;

namespace CodeGenerator.Types
{
    class EventTypescriptClass : TypescriptClass
    {
        public string SchemaExport {get; private set;}

        public EventTypescriptClass(Type type, TypescriptClassCollection userTypes) : base(type, userTypes) { }

        protected override Func<string> CreateClassDeclarationBuilder
        (
            string inheritance,
            Dictionary<string, string> initializers,
            Dictionary<string, TypescriptProperty> options,
            Dictionary<string, TypescriptProperty> members
        )
        {
            var className = Type.GetTypescriptName();
            string schema = null;
            if (!Type.IsAbstract)
            {
                var instance = Activator.CreateInstance(Type, true) as Event;
                if (instance.Context.Count >= 2)
                {
                    SchemaExport = $"{Type.GetTypescriptName()}Schema";
                    schema = $@"
export const {SchemaExport} = {{
    context: '{instance.Context.First()}',
    schema: {instance.GetSchemaText()}
}};";
                }
            }

            return () => $@"
{FormatImports()}

export interface {Name}{inheritance} {{
{string.Join('\n', members.Values.Select(member => $"\t{member};"))}
}}

{(!initializers.Any() || Type.IsAbstract ? "" : $@"
export interface I{className}Params {{
{string.Join('\n', options.Values.Select(option => $"\t{option};"))}
}}

export function {className}(params: I{className}Params, settings?: CaliperSettings) : {Name} {{
    return {{
        {string.Join(",\n\t\t", initializers.Select(_ => $"{_.Key}: {_.Value}"))},
        ...params
    }};
}}
")}

{string.Join("\n\n", SubClasses.Select(_ => _.Value.ClassDeclaration))}
{schema}
";
        }
    }
}