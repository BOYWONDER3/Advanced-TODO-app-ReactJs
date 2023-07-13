export function TodoFilterForm({
  name,
  setName,
  hideCompleted,
  setHighCompleted,
}) {
  return (
    <div class="filter-form">
      <div class="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => setHighCompleted(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  );
}
