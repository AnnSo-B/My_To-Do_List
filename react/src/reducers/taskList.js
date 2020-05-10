// npm imports

// local imports

// state
const initialState = {
  taskList: [
    {
      "id": 7,
      "title": "Planifier le road-trip",
      "completion": 100,
      "status": 3,
      "created_at": "2020-05-08T09:56:03.000000Z",
      "updated_at": "2020-05-09T17:55:44.000000Z",
      "category_id": 3,
      "category": {
        "id": 3,
        "name": "Vacances",
        "status": 1,
        "created_at": "2020-05-08T09:51:46.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 8,
      "title": "Modif essai 2",
      "completion": 100,
      "status": 2,
      "created_at": "2020-05-08T09:56:03.000000Z",
      "updated_at": "2020-05-09T16:46:09.000000Z",
      "category_id": 3,
      "category": {
        "id": 3,
        "name": "Vacances",
        "status": 1,
        "created_at": "2020-05-08T09:51:46.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 9,
      "title": "Vérifier les dates de vacances",
      "completion": 25,
      "status": 3,
      "created_at": "2020-05-08T09:56:03.000000Z",
      "updated_at": "2020-05-09T17:55:33.000000Z",
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Ecoles",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 10,
      "title": "Test depuis insomnia",
      "completion": 0,
      "status": 1,
      "created_at": "2020-05-08T13:36:52.000000Z",
      "updated_at": "2020-05-09T17:48:57.000000Z",
      "category_id": 1,
      "category": {
        "id": 1,
        "name": "Courses",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 12,
      "title": "Test de mise à jour depuis Insomnia",
      "completion": 100,
      "status": 2,
      "created_at": "2020-05-08T14:05:59.000000Z",
      "updated_at": "2020-05-08T14:23:51.000000Z",
      "category_id": 1,
      "category": {
        "id": 1,
        "name": "Courses",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 13,
      "title": "Titre du test 2",
      "completion": 0,
      "status": 1,
      "created_at": "2020-05-08T17:53:19.000000Z",
      "updated_at": "2020-05-09T17:48:55.000000Z",
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Ecoles",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 19,
      "title": "ajout d'une tâche à faire",
      "completion": 0,
      "status": 1,
      "created_at": "2020-05-09T17:20:21.000000Z",
      "updated_at": "2020-05-09T17:20:21.000000Z",
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Ecoles",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    },
    {
      "id": 20,
      "title": "Ajout d'une 2nde tâche à faire",
      "completion": 0,
      "status": 1,
      "created_at": "2020-05-09T17:20:32.000000Z",
      "updated_at": "2020-05-09T17:48:53.000000Z",
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Ecoles",
        "status": 1,
        "created_at": "2020-05-08T09:51:38.000000Z",
        "updated_at": null
      }
    }
  ]
};

// reducer
export default (state = initialState, action = {}) => {
  return state;
};
