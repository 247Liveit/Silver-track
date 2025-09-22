export type ColumnIndexType=('/users'&'/classes'&'/lessons');
const columns = {
    "/users": [
        {name: "ID", uid: "id", sortable: true},
        {name: "NAME", uid: "name", sortable: true},
        {name: "EMAIL", uid: "email", sortable: true},
        {name: "Role", uid: "roleName", sortable: true},
        {name: "isActive", uid: "isActive", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/classes": [
        {name: "ID", uid: "id", sortable: true},
        {name: "NAME", uid: "name", sortable: true},
        {name: "Created By", uid: "userName", sortable: true},
        {name: "Price", uid: "price", sortable: true},
        {name: "Offer", uid: "offer", sortable: true},
        {name: "featured", uid: "featured", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/lessons": [
        {name: "ID", uid: "id", sortable: true},
        {name: "NAME", uid: "name", sortable: true},
        {name: "Class Name", uid: "className", sortable: true},
        {name: "Order", uid: "sort", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"},
        ],
    "/orders": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Class Name", uid: "className", sortable: true},
        {name: "Class Price", uid: "classPrice", sortable: true},
        {name: "User Name", uid: "userName", sortable: true},
        {name: "Status", uid: "status", sortable: true},
        {name: "Payment Type", uid: "paymentType", sortable: true},
        {name: "Payment Id", uid: "paymentId", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "all", uid: "all"}
    ],
    "/request-quotes": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Name", uid: "name", sortable: true},
        {name: "Company Name", uid: "companyName", sortable: true},
        {name: "Email", uid: "email", sortable: true},
        {name: "Phone", uid: "phone", sortable: true},
        {name: "Needs", uid: "note", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/contact-us": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Name", uid: "name", sortable: true},
        {name: "Company Name", uid: "companyName", sortable: true},
        {name: "Email", uid: "email", sortable: true},
        {name: "Phone", uid: "phone", sortable: true},
        {name: "Needs", uid: "note", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/testimonials": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Title", uid: "title", sortable: true},
        {name: "Description", uid: "description", sortable: false},
        {name: "Date", uid: "date", sortable: true},
        {name: "File", uid: "file", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/pages-metadata": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Page", uid: "page", sortable: true},
        {name: "Title", uid: "title", sortable: true},
        {name: "Description", uid: "description", sortable: false},
        {name: "Keywords", uid: "keywords", sortable: false},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/news": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Title", uid: "title", sortable: true},
        {name: "Description", uid: "description", sortable: false},
        {name: "File", uid: "file", sortable: true},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ],
    "/quizzes": [
        {name: "ID", uid: "id", sortable: true},
        {name: "Title", uid: "title", sortable: true},
        {name: "Page Name", uid: "pageName", sortable: true},
        {name: "Quiz Time", uid: "quizTime", sortable: false},
        {name: "Success Percentage", uid: "successPercentage", sortable: false},
        {name: "CREATED AT", uid: "created_at", sortable: true},
        {name: "ACTIONS", uid: "actions"},
        {name: "all", uid: "all"}
    ]
};

const getColumns = (url:ColumnIndexType ) => {
    return columns[url]
}

export {columns, getColumns};
