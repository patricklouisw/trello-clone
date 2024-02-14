import formatTodosforAI from "@/lib/formatTodosForAI";

export const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosforAI(board);

    // const res = await fetch("/api/generateSummary", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({todos}),
    // });

    // const GPTData = await res.json();
    // const { content } = GPTData;

    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
    await delay(1000)

    const content = `Hello, Mr. Patrick! Welcome back to Trello!
    Here is a summary of your todos. You have ${todos.todo} tasks in todo,
    ${todos.inprogress} tasks in In-progress, and ${todos.done} tasks in done.
    Keep up the good work and have a productive day!`;

    return content;


}