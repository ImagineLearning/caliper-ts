using System;
using System.Collections.Generic;
using System.Linq;
using ImsGlobal.Caliper;
using ImsGlobal.Caliper.Entities;

namespace CodeGenerator.Types
{
    class SystemIdentifierTypescriptClass : TypescriptClass
    {
        public SystemIdentifierTypescriptClass(TypescriptClassCollection userTypes) : base(typeof(SystemIdentifier), userTypes) { }

        protected override Func<string> CreateClassDeclarationBuilder
        (
            string inheritance,
            Dictionary<string, string> initializers,
            Dictionary<string, TypescriptProperty> options,
            Dictionary<string, TypescriptProperty> members
        )
        {
            IncludeImport(userTypes[typeof(SoftwareApplication)], new[] { typeof(SoftwareApplication).Name });

            options = new Dictionary<string, TypescriptProperty>(members);
            if (options.ContainsKey("source"))
                options.Remove("source");

            if (options.ContainsKey("type"))
                options.Remove("type");

            if (members.ContainsKey("sourceUrl"))
                members.Remove("sourceUrl");

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
	const {{ sourceUrl, ...args }} = params;
    const source = {typeof(SoftwareApplication).Name}({{ id: sourceUrl }});

    return {{
        {string.Join(",\n\t\t", initializers.Select(_ => $"{_.Key}: {_.Value}"))},
        source,
        ...args
    }};
}}
")}

{string.Join("\n\n", SubClasses.Select(_ => _.Value.ClassDeclaration))}
";
        }
    }
}