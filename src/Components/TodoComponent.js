// Components klasörü: Ekranda listelenecek elemanların tasarım parçalarını (kartlarını) üretir.
function createTodoItemElement(task, index, onDelete, onUpdate) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    const span = document.createElement('span');
    span.textContent = task;
    
    const btnGroup = document.createElement('div');
    
    // Düzenle Butonu
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-warning me-2';
    editBtn.textContent = 'Düzenle';
    editBtn.onclick = () => onUpdate(index);
    
    // Sil Butonu
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger';
    deleteBtn.textContent = 'Sil';
    deleteBtn.onclick = () => onDelete(index);
    
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(btnGroup);
    
    return li;
}
