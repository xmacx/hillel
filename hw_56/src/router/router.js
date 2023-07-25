import Router from "@/plugins/router";
import Movies from "@/pages/movies/Movies";
import SignIn from "@/pages/signIn/SignIn";
import SignUp from "@/pages/signUp/SignUp";
import NotFound from "@/pages/not-found/NotFound";

const routes = [
    {
        path: '/',
        component: Movies
    },
    {
        path: '/sign-in',
        component: SignIn
    },
    {
        path: '/sign-up',
        component: SignUp
    },
    {
        path: '*',
        component: NotFound
    }
]

export const router = new Router(routes)