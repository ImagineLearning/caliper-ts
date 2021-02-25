using System;
using System.Collections.Generic;

namespace CodeGenerator
{
    class TypescriptProperty
    {
        public string Name { get; set; }

        public IEnumerable<string> TypeNames => typeNames;

        public bool IsRequired { get; set; }


        HashSet<string> typeNames = new HashSet<string>();

        public void AddType(string typeName)
        {
            if (!typeNames.Contains(typeName))
                typeNames.Add(typeName);
        }

        public TypescriptProperty Clone()
        {
            var clone = new TypescriptProperty();
            clone.Name = Name;
            clone.IsRequired = IsRequired;
            clone.typeNames = new HashSet<string>(typeNames);

            return clone;
        }

        public override string ToString()
        {
            return $"{Name}{(IsRequired ? "" : "?")}: {string.Join(" | ", TypeNames)}";
        }
    }
}