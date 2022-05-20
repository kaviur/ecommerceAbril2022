import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import database from '../../../database';
import {setCookies} from 'cookies-next'
//import { firestore } from "firebase/admin";

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),//http://localhost:3000/api/auth/callback/google
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    pages:{
        signIn:"/login",
    },
    callbacks:{
        async jwt({token,account}){
            //console.log("JWT",token)
            if(account?.providerAccountId){
                token.id = account.providerAccountId
                const snapshot = await database.collection("users").doc(account.providerAccountId).get()
                if(snapshot.exists){
                    const user = snapshot.data()
                    console.log(user);
                    if(user.role){
                        token.role = user.role
                    }
                }else{
                    await database.collection("users").doc(account.providerAccountId).set({
                        id:account.providerAccountId,
                        role:"regular",
                        id:account.providerAccountId,
                        email:token.email,
                        name:token.name,
                        profileImg:token.picture
                    })
                    token.role = 'regular'
                }
            }
            return token
        },
        async session({ session, token, user }){
            if(token?.id && token?.role){
                session.user.id = token.id
                session.user.role = token.role
                session.user.mail = token.email
                
            }
            return session
        }
    }
}) 