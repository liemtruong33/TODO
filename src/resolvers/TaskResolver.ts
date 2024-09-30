import {Resolver, Query, Mutation, Arg} from "type-graphql"; //let us define how we can get and change data in our GraphQL API
import {Task} from "../schema/Task";
import {prisma} from "../prismaClient";

@Resolver(of => Task)   //This tells GraphQl that this class(TaskResolver) is a resolver for the Task type.
export class TaskResolver {
    @Query(() => [Task]) //decorator from TypeGraphQL, GraphQL queries are used to fetch data. Specifies the return type of the query, which is an array [] of Task objects.
    async tasks(): Promise<Task[]> {    //Async: It will perform operations that take some time (like fetching data from a database) without blocking other operations.
                                        //tasks: name of the function that will handle this query.
                                        //Promise<Task[]>: the function returns a promise that resolves to an array of Task objects. Promise means  it doesnt return a result immediately
        return await prisma.task.findMany(); //return await tells the function to wait until the data is fetched from the database (because its async)
                                            //Prisma is the instance of Prisma Client, findMany() method provided by Prisma that tells the database to find and return all rows from the Task table
    }
    @Mutation(() => Task) //tells GraphQL that this mutation will return a single Task Object
    async createTask(
        @Arg("title") title: string  //input, This defines an argument for the mutation. When a client calls createTask, they need to provide a title for the new task. For example title "Buy groceries." 
    ): Promise<Task> { //return
        return await prisma.task.create({  //prisma.task.create is a PrismaClient command that creates a new task in the database.
            data: {title, completed: false}  //new task with the provided title and sets completed to false (since new tasks aren't completed by default).
        });

    }

    @Mutation(() =>Task)
    async toggleTaskCompletion( //GraphQL mutation, update and existing task by toggling its completed status.
        @Arg("id") id: string  //This mutation takes an id argument, the id is used to find the task that needs to be updated.
    ): Promise<Task | null> {  //return type of a function: EITHER Task or null
        const task = await prisma.task.findUnique({ where: {id}});  //This is a Prisma Client command that looks for a task in the database by its id.
        if (!task) return null; //if it can't find the id, the function returns null

        return await prisma.task.update({  //if the task is found, this command updates the completed field of the task.
            where: {id},  //which task u want to update
            data: {completed: !task.completed} // ! means not the current value of completed
        });

    }

}