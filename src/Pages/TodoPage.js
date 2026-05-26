// Pages klasörü: Tüm sayfa yönetimini ve CRUD (Ekle-Sil-Güncelle-Listele) işlevlerini yönetir.
let tasks = [];

function initTodoPage() {
    const taskInput = document.getElementById('taskInput');
    const searchInput = document.getElementById('searchInput'); // Yeni: Arama kutusu bağlantısı
    const taskCountBadge = document.getElementById('taskCountBadge'); // Yeni: Sayaç bağlantısı
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');

    function renderTasks() {
        taskList.innerHTML = '';
        
        // Arama kutusundaki metni alıp küçük harfe çeviriyoruz (büyük/küçük harf duyarlılığını kaldırmak için)
        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        tasks.forEach((task, index) => {
            // Eğer görev metni, aranan kelimeyi içeriyorsa ekranda göster
            if (task.toLowerCase().includes(searchTerm)) {
                const todoItem = createTodoItemElement(task, index, deleteTask, updateTask);
                taskList.appendChild(todoItem);
                visibleCount++; // Ekranda gösterilenleri say
            }
        });

        // Sayacı güncelle
        if (searchTerm === "") {
            taskCountBadge.textContent = `Toplam Görev: ${tasks.length}`;
        } else {
            taskCountBadge.textContent = `Bulunan: ${visibleCount} / Toplam: ${tasks.length}`;
        }
    }

    function deleteTask(index) {
        if (confirm("Bu görevi silmek istediğine emin misin?")) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }

    function updateTask(index) {
        const newTaskText = prompt("Görevi güncelle:", tasks[index]);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            tasks[index] = newTaskText.trim();
            renderTasks();
        }
    }

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            taskInput.value = '';
            renderTasks();
        } else {
            alert("Lütfen boş bir görev eklemeyin!");
        }
    });

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTaskBtn.click();
    });

    // YENİ: Arama kutusuna her harf yazıldığında listeyi anlık olarak filtrele
    searchInput.addEventListener('input', renderTasks);
}

// Sayfa hazır olduğunda sistemi tetikle
document.addEventListener('DOMContentLoaded', initTodoPage);