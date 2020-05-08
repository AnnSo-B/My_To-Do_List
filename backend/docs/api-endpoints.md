# API Endpoints

| Endpoint | Method HTTP | Data | Description |
|--|--|--|--|
| `/categories` | GET | - | Retrieve all the categories |
| `/categories/[id]` | GET | - | Retrieve the category which id is provided |
| `/categories` | POST | name, status | Create a new category including its name and status |
| `/categories/[id]` | PUT | name, status | Update the category which id is provided |
| `/categories/[id]` | DELETE | - | Delete the category which id is provided |
| `/tasks` | GET | - | Retrieve all the tasks |
| `/tasks/[id]` | GET | - | Retrieve the task which id is provided |
| `/tasks` | POST | title, categoryId, completion, status | Create a new task |
| `/tasks/[id]` | PUT | title, categoryId, completion, status | Update the task which id is provided |
| `/tasks/[id]` | DELETE | - | Delete the task which id is provided |
