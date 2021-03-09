$destination = $(get-location).Path + "/packages/caliper-ts-models/src"
remove-item ($destination + "/Events") -force -recurse
remove-item ($destination + "/Entities") -force -recurse

dotnet run --project code-generator -- $destination
npx @imaginelearning/ts-imports-organizer "packages/caliper-ts-models/src/**/*.ts"
npx prettier --write "packages/caliper-ts-models/src/**/*.ts"
