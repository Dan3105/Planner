# Database Design Documentation

## Current Schema Structure

### Workspace Model

| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Primary key |
| title | String | Workspace title |
| createdAt | DateTime | Creation timestamp |

### Page Model

| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Primary key |
| title | String | Page title |
| content | String? | Legacy content field |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |
| workspaceId | String | Foreign key to Workspace |

### Block Model

| Field | Type | Description |
|-------|------|-------------|
| id | String (UUID) | Primary key |
| type | String | Block type identifier |
| content | Json? | Block content |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime? | Last update timestamp |
| order | Int | Block sequence |
| pageId | String | Foreign key to Page |

## Entity Relationship Diagram

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    Workspace ||--o{ Page : contains
    Page ||--o{ Block : contains
    
    Workspace {
        string id
        string title
        datetime createdAt
    }
    
    Page {
        string id
        string title
        string content
        datetime createdAt
        datetime updatedAt
        string workspaceId
    }
    
    Block {
        string id
        string type
        json content
        datetime createdAt
        datetime updatedAt
        int order
        string pageId
    }
```

