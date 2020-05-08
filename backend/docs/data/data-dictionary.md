# Data dictionary

## Tasks (`tasks`)

| Field | Type | Specifics | Description |
|-|-|-|-|
| id | INT | UNSIGNED, NOT NULL, PRIMARY KEY, AUTO_INCREMENT | Task identifier |
| title | VARCHAR(128) | NOT NULL | Task title |
| completion | TINYINT(3) |  DefaultValue = 0, UNSIGNED , NOT NULL | Percentage of task completion |
| status | TINYINT(3) | DefaultValue = 1, UNSIGNED, NOT NULL | Task status - 1 = incomplete - 2 = complete - 3 = archived |
| created_at | TIMESTAMP | CURRENT_TIMESTAMP, NOT NULL | Creation date of the task |
| updated_at | TIMESTAMP | NULL | The update date of the task |
| category_id | INT(10) | UNSIGNED, NOT NULL | Id of the category associated with the task |

## Categories (`categories`)

| Field | Type | Specifics | Description |
|-|-|-|-|
| id | INT | UNSIGNED, NOT NULL, PRIMARY KEY, AUTO_INCREMENT | Category identifier |
| name | VARCHAR(64) | NOT NULL | Category name |
| status | TINYINT(3) | DefaultValue = 1, UNSIGNED, NOT NULL | Category status - 1 = active - 2 = inactive |
| created_at | TIMESTAMP | CURRENT_TIMESTAMP, NOT NULL | Creation date of the category |
| updated_at | TIMESTAMP | NULL | The update date of the category |
