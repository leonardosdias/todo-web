import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "../read-all/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent implements OnInit {
  constructor(private router: Router, private service: TodoService) {}

  todo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  ngOnInit(): void {}

  create(): void {
    this.formatarData();
    this.service.create(this.todo).subscribe({
      next: () => {
        this.service.message("Tarefa criada com sucesso.");
        this.router.navigate([""]);
      },
      error: () => {
        this.service.message("Falha ao criar a tarefa.");
        this.router.navigate([""]);
      },
    });
  }

  formatarData(): void {
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }

  cancel(): void {
    this.router.navigate([""]);
  }
}
