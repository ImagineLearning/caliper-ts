using ImsGlobal.Caliper.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CodeGenerator.Types
{
    class CaliperRoleTypescriptClass : TypescriptClass
    {
        public CaliperRoleTypescriptClass() : base(typeof(Role)){}

        protected override Func<string> CreateClassDeclaration()
        {
            var enums = new List<string>();
            var properties = Type.GetProperties(BindingFlags.Public | BindingFlags.Static);
            foreach (var property in properties)
            {
                var subProperties = property.PropertyType.GetProperties().Where(_ => typeof(Role).IsAssignableFrom(_.PropertyType));
                var subRole = property.GetValue(null, null);
                enums.Add($"\t{subRole.ToString().ToUpper().Replace("#", "_").Replace('-', '_')} = \"{subRole}\"");

                foreach (var subProperty in subProperties)
                {
                    var role = subProperty.GetValue(subRole) as Role;
                    enums.Add($"\t{role.ToString().ToUpper().Replace("#", "_").Replace('-', '_')} = \"{role}\"");
                }
            }

            return () => $"export enum {Type.Name} {{\n{string.Join(",\n", enums)}\n}}";
        }
    }
}