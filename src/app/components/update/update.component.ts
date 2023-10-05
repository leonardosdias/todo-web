import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoService } from "src/app/services/todo.service";
import { Todo } from "../read-all/models/todo";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent {
  constructor(
    private router: Router,
    private service: TodoService,
    private activatedRoute: ActivatedRoute
  ) {}

  todo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  ngOnInit(): void {
    this.todo.id = this.activatedRoute.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(Number(this.todo.id)).subscribe((resposta) => {
      this.todo = resposta;
    });
  }

  update(): void {
    this.formatarData();
    this.service.update(this.todo).subscribe({
      next: () => {
        this.service.message("Tarefa atualizada com sucesso.");
        this.router.navigate([""]);
      },
      error: () => {
        this.service.message("Falha ao atualizar a tarefa.");
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
