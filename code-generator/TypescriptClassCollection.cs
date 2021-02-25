using System;
using System.Collections.Generic;
using System.Linq;
using CodeGenerator.Types;

namespace CodeGenerator
{
    class TypescriptClassCollection : Dictionary<string, TypescriptClass>
    {
        Dictionary<string, TypescriptClass> unparentedSubClasses = new Dictionary<string, TypescriptClass>();

        public TypescriptClass this[Type type]
        {
            get
            {
                var names = type.GetNames();
                var collection = this;
                TypescriptClass javaClass = null;

                int i = 0;
                do
                {
                    javaClass = collection[names[i]];
                    collection = javaClass.SubClasses;
                } while (++i < names.Length);

                return javaClass;
            }
            set => SetJavaClass(type, value, true);
        }

        public bool ContainsKey(Type type)
        {
            var names = type.GetNames();
            var collection = this;

            int i = 0;
            do
            {
                if (collection == null || !collection.ContainsKey(names[i]))
                {
                    var name = type.FullName.Split('.').Last();
                    return unparentedSubClasses.ContainsKey(name);
                }

                var javaClass = collection[names[i]];
                collection = javaClass?.SubClasses;
            } while (++i < names.Length);

            return true;
        }

        public void ResolveUnparentedSubClasses()
        {
            var names = unparentedSubClasses.Keys.ToList();
            foreach (var name in names)
            {
                var subClass = unparentedSubClasses[name];
                if (subClass != null && SetJavaClass(subClass.Type, subClass, false))
                    unparentedSubClasses.Remove(name);
            }
        }

        bool SetJavaClass(Type type, TypescriptClass value, bool tryResolve)
        {
            var names = type.GetNames();
            var collection = this;

            int i = 0;
            while (i < names.Length - 1)
            {
                if (!collection.ContainsKey(names[i]))
                {
                    collection = null;
                    break;
                }

                if (collection == null)
                    break;

                var javaClass = collection[names[i]];
                collection = javaClass?.SubClasses;
                ++i;
            }

            if (collection == null)
            {
                SaveUnparentedSubClass(type, value);
                return false;
            }

            collection[type.Name] = value;
            if (tryResolve)
                ResolveUnparentedSubClasses();
            return true;
        }

        void SaveUnparentedSubClass(Type type, TypescriptClass javaClass)
        {
            var name = type.FullName.Split('.').Last();
            unparentedSubClasses[name] = javaClass;
        }
    }
}