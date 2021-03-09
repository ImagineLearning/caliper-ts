using System;
using System.Collections.Generic;
using System.Linq;
using ImsGlobal.Caliper.Entities;

namespace CodeGenerator.Types
{
    class DomainTypescriptClass : TypescriptClass
    {
        public DomainTypescriptClass(TypescriptClassCollection userTypes) : base(typeof(Domain), userTypes) { }

        protected override Func<string> CreateClassDeclarationBuilder
        (
            string inheritance,
            Dictionary<string, string> initializers,
            Dictionary<string, TypescriptProperty> options,
            Dictionary<string, TypescriptProperty> members
        )
        {
            if (options.ContainsKey("id"))
                options.Remove("id");

            return () => $@"
{FormatImports()}

export interface {Name}{inheritance} {{
{string.Join('\n', members.Values.Select(member => $"\t{member};"))}
}}

{(!initializers.Any() ? "" : $@"
export interface I{Type.GetTypescriptName()}Params {{
{string.Join('\n', options.Values.Select(option => $"\t{option};"))}
}}

export function {Type.FullName.Split('.').Last().Replace("+", "_")}(params: I{Type.GetTypescriptName()}Params) : {Name} {{
    return {{
        id: `urn:domain:${{params.standard.toLocaleUpperCase()}}${{params.code.toLocaleUpperCase()}}`,
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