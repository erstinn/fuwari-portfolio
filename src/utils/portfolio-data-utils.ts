
import {createDirectus, authentication,
    rest, graphql,
    readItems} from "@directus/sdk";

// TODO
//  would usually put on .env, the URL for this but since it's on docker-compose:

const apiURL = 'http://localhost:8055'
const email = 'admin@example.com'
const password = 'd1r3ctu5'

const setupDirectusConnection = async function() {
    const client = createDirectus(apiURL).with(authentication()).with(rest());
    await client.login(email, password);
    return client;
}

const client = await setupDirectusConnection(); //dont know if works outside; prob this is on some main file



interface Hobbies  {
    title: string;
    description: string | null;
}

type Projects = { //todo interface vs type
    title: string;
    description: string;
    tech_stacks: [];
    url: string;
    status: boolean;
}

interface TechStacks {
    id: number; //todo maybe remove
    title: string;
    description: string | null;
}

interface Me {
    username: string;
    first_name: string;
    last_name: string;
    description: string; //your intro
    age: number;
    tech_stacks: TechStacks;
}

interface Authors {
    id: number;
    first_name: string;
    last_name: string;
}

interface Books {
    title: string;
    description: string | null;
    genre: [];
    author: Authors;
    published_date: Date; //GET YEAR ONLY
}



export async function getHobbies(): Promise<Hobbies[]> {
    let hobbies: Hobbies[] = [];
    const result = await client.request(readItems('Hobbies'))
    hobbies = result.map((data) => ({
        title: data.title,
        description: data.description
    }))
    console.log('hobbies: ', hobbies)
    return hobbies;
}

async function getAuthors(): Promise<Authors[]> {
    let authors: Authors[] = [];
    const result = await client.request(readItems('Authors'));
    authors = result.map((data) => ({
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
    }))
    console.log('authors : ', authors)
    return authors
}

export async function getBooks(): Promise<Books[]> {
    const authors = await getAuthors();
    let books: Books[] = [];
    const result = await client.request(readItems('Books'));
    books = result.map((data) => ({
        id: data.id,
        title: data.title,
        description: data.description
    }))
    console.log('books', books)
    return books;

}

export async function getProjects(): Promise<Projects[]> {
    let projects: Projects[] = [];
    const result = await client.request(readItems('Books'));
    projects = result.map((data) => ({
        title: data.title,
        description: data.description,
        tech_stacks: data.tech_stacks,
        url: data.url,
        status: data.status
    }))
    console.log('projects: ',  projects)
    return projects;
}


// Just for maybe summary page
export async function getMe(): Promise<Me[]> {
    let me: Me[] = [];
    const res = await client.request(readItems('Me'));
    me = res.map((data) => ({
        name: data.name,
        description: data.description,
        tech_stacks: data.tech_stacks
    }))
    console.log('me : ', me)
    return me;
}