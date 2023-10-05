import { Component } from "@angular/core";
import { Todo } from "../read-all/models/todo";
import { TodoService } from "src/app/services/todo.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-finalizados",
  templateUrl: "./finalizados.component.html",
  styleUrls: ["./finalizados.component.css"],
})
export class FinalizadosComponent {
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        }
      });
    });
  }

  voltar() {
    this.router.navigate([""]);
  }
}
