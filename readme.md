# To-Do app

## NOTES
1. Stor will be JSON file  under /data folder
2. Sake of simplicity This is single user command Utility. That means concurrent operations are not considered

## Application Requirements

Following technologies used in this assignment 

1. NodeJS

## Project Notes

1. Used repository to store data on the local
2. Task service is contract with the ITask interface
3. Used `eslint` and `.prettierrc` to maintain code readability and maintainability
4. `.editorconfig` used for make development editor ready for the code
5. Used Jest for do the service test 
`NOTE Minimum feature tested`



### How to run the application
Clone project repository from the github

```bash
git clone git@github.com:Piusha/to-do-cli-app.git
cd  to-do-cli-app
```
#### Run Test cases
```bash
npm run test
```

#### Run Application
Create Task
```bash
npx ts-node src/index.ts add "title" "Description" "priority"
```
List Tasks
```bash
npx ts-node src/index.ts list
```
Update Tasks
```bash
npx ts-node src/index.ts update <taskID>  [--title=""] [--description=""] [--priority=""] 
```
`[--title=""] [--description=""] [--priority=""] ` Parameters are optional 
example
Update remove task
```bash
npx ts-node src/index.ts remove <taskID> 
```
Complete task
```bash
npx ts-node src/index.ts complete <taskID> 
```

### Project Structure

Following is the project structure

```
├── app
│   ├── bootstrap
│   │   ├── task-service.provider.ts
│   ├── commands
│   │   ├── (*).ts
│   ├── constants
│   │   ├── (*).ts
│   ├── exceptions
│   │   ├── task.exception.ts
│   ├── interfaces
│   │   ├── *.interfaces.ts
│   ├── services
│   │   ├── task.service.ts
│   ├── types
│   │   ├── command-argument.types.ts
│   │   ├── task.types.ts
│   ├── util
│   │   ├── util.ts
│   ├── validator
│   │   ├── task.validator.ts
```





