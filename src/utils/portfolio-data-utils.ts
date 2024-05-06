
import {createDirectus, authentication,
    rest, graphql,
    readItems} from "@directus/sdk";

// TODO
//  would usually put on .env, the URL for this but since it's on docker-compose:

const apiURL = 'http://localhost:8055'
const email = 'admin@example.com'
const password = 'd1r3ctu5'


interface Hobbies  {
    title: string;
    description: string | null;

}

type Projects = { //todo interface vs type
    title: string;
    description: string;
    techStacks: [];
    url: string;
    status: boolean;
}

interface TechStacks {
    id: number; //todo maybe remove
    title: string;
    description: string | null;
}

interface Me {
    name: string;
    description: string;
    techStacks: [];
}

const setupDirectusConnection = async function() {
    const client = createDirectus(apiURL).with(authentication()).with(rest());
    await client.login(email, password);
    return client;
}

export async function getHobbies(): Promise<Hobbies[]> {
    const client = await setupDirectusConnection();
    let hobbies: Hobbies[] = [];
    const result = await client.request(readItems('Hobbies'))
    hobbies = result.map((data) => ({
        title: data.title,
        description: data.description
    }))
    // console.log('YAHOO', result);
    return hobbies;
}

export async function getProjects(): Promise<Projects[]> {
    
    return
}
export async function getMe(): Promise<Me[]> {

    return
}