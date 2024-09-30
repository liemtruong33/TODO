import {ObjectType, Field, ID} from "type-graphql"; //ObjectType: Task class represents an object that can be queried in the API, decorator
                                                    //Field: This decorator marks individual properties (like id, title, and completed) as field that can be requested in a GraphQL query

@ObjectType()
export class Task {
    @Field(()=> ID) //id will be of type ID, usually a unique String used to identify
    id!: string;

    @Field()
    title!: string;

    @Field()
    completed!: boolean;
}
