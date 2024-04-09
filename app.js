$(document).ready(function () {
  // Global Settings
  let edit = false;

  // Testing Jquery

  fetchTasks();
  $("#task-result").hide();

  // search key type event
  $("#search").keyup(function () {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        data: { search },
        type: "POST",
        success: function (response) {
          if (!response.error) {
            let tasks = JSON.parse(response);
            let template = "";
            tasks.forEach((task) => {
              template += `
                     <li><a href="#" class="task-item">${task.title}</a></li>
                    `;
            });
            $("#task-result").show();
            $("#container").html(template);
          }
        },
      });
    }
  });

  $("#task-form").submit((e) => {
    e.preventDefault();
    const postData = {
      title: $("#title").val(),
      content: $("#content").val(),
      id: $("#taskId").val(),
    };
    const url = !edit ? "task-add.php" : "task-edit.php";
    $.post(url, postData, (response) => {
      $("#task-form").trigger("reset");
      fetchTasks();
    });
  });

  // Fetching Tasks
  function fetchTasks() {
    $.ajax({
      url: "tasks-list.php",
      type: "GET",
      success: function (response) {
        const tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `
                  <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td>
                  <a href="#" class="task-item">
                    ${task.title} 
                  </a>
                  </td>
                  <td>${task.content}</td>
                  <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                  </td>
                  </tr>
                `;
        });
        $("#tasks").html(template);
      },
    });
  }

  // Get a Single Task by Id
  $(document).on("click", ".task-item", (e) => {
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr("taskId");
    $.post("task-single.php", { id }, (response) => {
      const task = JSON.parse(response);
      $("#title").val(task.title);
      $("#content").val(task.content);
      $("#taskId").val(task.id);
      edit = true;
    });
    e.preventDefault();
  });

  // Delete a Single Task
  $(document).on("click", ".task-delete", (e) => {
    if (confirm("Are you sure you want to delete it?")) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr("taskId");
      $.post("task-delete.php", { id }, (response) => {
        fetchTasks();
      });
    }
  });
});
