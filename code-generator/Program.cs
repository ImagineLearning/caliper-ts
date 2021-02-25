using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CodeGenerator.Types;
using ImsGlobal.Caliper;
using ImsGlobal.Caliper.Entities;
using ImsGlobal.Caliper.Events;

namespace CodeGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Caliper.ApplicationURI = new Uri("https://typescript.gen");

            if(args.Length < 1)
                throw new ArgumentException("arg[0] must be the destination path to write the code files");

            var destination = args[0].Replace('\\', '/');
            Console.WriteLine("Generating code files at: " + destination);

            var userTypes = GetTypescriptClasses();
            WriteTypescriptClasses(userTypes, destination);
            WriteTypescriptIndex(userTypes, destination);
        }

        static TypescriptClassCollection GetTypescriptClasses()
        {        
            var eventType = typeof(Event);
            var entityType = typeof(Entity);
            var assembly = eventType.Assembly;

            var types = new List<Type>();
            types.AddRange(assembly.GetTypes().Where(_ => eventType.IsAssignableFrom(_)));
            types.AddRange(assembly.GetTypes().Where(_ => entityType.IsAssignableFrom(_)));

            var userTypes = new TypescriptClassCollection();
            foreach (var type in types)
            {
                if (type.IsAbstract || userTypes.ContainsKey(type.Name))
                    continue;

                var @class = TypescriptClass.FromType(type, userTypes);
                @class.Build();
            }
            return userTypes;
        }

        static void WriteTypescriptClasses(TypescriptClassCollection userTypes, string destination)
        {
            var omissions = new[] { "ImsGlobal", "Caliper" };
            foreach (var item in userTypes)
            {
                var declaration = item.Value;
                var names = declaration.Type.Namespace.Split('.').Where(name => !omissions.Contains(name));
                var directory = $"{destination}/{string.Join("/", names)}";
                if (!Directory.Exists(directory))
                    Directory.CreateDirectory(directory);

                using (var writer = new StreamWriter($"{directory}/{declaration.Type.Name}.ts"))
                {
                    writer.Write(declaration.ClassDeclaration);
                }
            }
        }

        static void WriteTypescriptIndex(TypescriptClassCollection userTypes, string destination)
        {
             var exports = userTypes
                .Select(item => $"export * from '{typeof(Caliper).GetRelativeDirectory(item.Value.Type)}{item.Value.Type.Name}';")
                .ToList();
            exports.Sort();
            exports.InsertRange(0, new[]
            {
                "export * from './sensor';",
                "export * from './clients/httpClient';",
                "export * from './Caliper';",
                "export { Config } from './config/config';",
                "export { Envelope, EnvelopeOptions } from './envelope';",
                "",
            });

            using (var writer = new StreamWriter($"{destination}/index.ts"))
            {
                writer.Write(string.Join("\n", exports));
            }
        }
    }
}
