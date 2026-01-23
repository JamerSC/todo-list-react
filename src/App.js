// import { useEffect, useState } from "react";
import TodoNav from "./components/TodoNavBar";
import TodoModal from "./components/TodoFormModal";
import TodoTable from "./components/TodoTable";
import SearchBar from "./components/SearchBar";
import SelectOption from "./components/SelectOption";
import useTodos from "./hooks/useTodos";
import { statusOptions } from "./data/statusOptions";
import TodoPagination from "./components/Pagination";

// import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";

function App() {
  const {
    todos,
    currentTodo,
    setCurrentTodo,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    handleSave,
    handleUpdate,
    handleDelete,

    apiError,
    // setApiError,

    // pagination
    page,
    setPage,
    totalPages,
    // totalElements,
  } = useTodos();

  return (
    <>
      <div className="container mt-4">
        <TodoNav />
        <div className="d-flex justify-content-between align-items-center my-3 flex-wrap gap-3">
          <TodoModal
            onSave={handleSave}
            onClose={() => setCurrentTodo(null)}
            todo={currentTodo}
            apiError={apiError}
          />
          <div className="ms-auto d-flex align-items-center gap-3 flex-wrap">
            <div style={{ minWidth: "180px" }}>
              <SelectOption
                value={filterStatus}
                options={statusOptions}
                onChange={setFilterStatus}
              />
            </div>

            <div style={{ minWidth: "250px" }}>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
        </div>
        <TodoTable
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
        <TodoPagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}

export default App;
