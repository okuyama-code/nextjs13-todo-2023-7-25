import { Task } from "./types";


// サーバーから全てのTODOリストのアイテムを取得する非同期関数
//関数が Promise<Todo[]> 型を返すことを示しています。つまり、この関数は Promise オブジェクトを返し、その中に Todo の配列が含まれているという意味です。
export const getAllTodos = async (): Promise<Task[]> => {
    // サーバーにリクエストを送信し、TODOリストのアイテムを取得します
    const res = await fetch(`http://localhost:3001/tasks`, { cache: "no-store" //SSR
    });

    // レスポンスのJSONデータを取得します
    // (fetch APIは非同期関数なので、データを取得するためにはawaitを使用します)
    const todos = await res.json(); // レスポンスのJSONデータを非同期に取得

    // 取得したTODOリストのアイテムをTodo型の配列として返します
    return todos;
}

//情報の更新頻度の少ないブログやヘルプページやドキュメンテーションはSSG　ページを早くする
// const res = await fetch(`http://localhost:3001/tasks`, { cache: "force-cache"}); SSGの場合
//getStaticPropsと同じ



//頻繁に更新される場合はSSR,ISRが適切　todoアプリやSNSのプロフィールなど
//const res = await fetch(`http://localhost:3001/tasks`, { cache: "no-store"}); SSRの場合
//getServerSidePropsと同じ


export const addTodo = async (todo: Task): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" //json形式を追加しますよという記述がないと動かない
        },
        body: JSON.stringify(todo), //引数から渡されたものをbodyに追加する
    });

    const newTodo = await res.json();

    return newTodo;
}

export const editTodo = async (id: string, newText: string): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json" //json形式を追加しますよという記述がないと動かない
        },
        body: JSON.stringify({ text: newText }), //textプロパティーはtodo.jsonから取っている。textをnewtextで更新する
    });

    const updatedTodo = await res.json();

    return updatedTodo;
}
export const deleteTodo = async (id: string): Promise<Task> => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" //json形式を追加しますよという記述がないと動かない
        },
    });

    const deleteTodo = await res.json();

    return deleteTodo;
}
