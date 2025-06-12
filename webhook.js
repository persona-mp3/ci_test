import { exec } from "node:child_process/promises"
// import fs from "node: fs/promises"
import dotenv from "dotenv"
dotenv.config()

const OWNER = process.env.OWNER

export async function HandleWebHook(req, res) {
    res.status(200).send("Webhook received")

    const body = req.body
    // const evt = req.headers[ "x-github-event" ]
    const evt = req.get( "x-github-event" )

    if (!evt) {
        console.log("evt header could not be read\n", evt)
        return
    }

    const repo = body.repository

    if (!repo) {
        console.log("uh---repo body is empty", repo)
        return
    }
    
    if (evt !== "push") {
        console.log(" event that occured is not a push event\n", evt)
        return
    }
    
    /*
     * now that the evt is a push event, we can write the html_url to content file
     * and other info like hashId just incase, 
     * we could basic auth, but not now, just trying to get it to work
     */
    
    if (repo.owner.name !== OWNER || repo.name !== "yogit") {
        console.log(" hmm. invalid repo! how ??\n")
        console.log(" Repo Owner -> %s\n, Repo Name -> %s\n", repo.owner.name, repo.name)
        return
    }
    
    const repoUrl = repo.html_url
    console.log(" url to the repository -> %s", repoUrl)
    

       // excute script that takes repoUrl as argument to clone and do stuff
    await SetUp(repoUrl)

}

/**
 * 
 * @param {string} repoUrl 
 * @returns {void}
 */

async function SetUp(repoUrl) {
    try {
        const child = await exec(`bash s1.sh ${repoUrl}`, (err, stdout, stderr ) => {
            if (err) {
                console.log(" error occured in executing s1.sh??\n", err)
                console.log("\n\n --- stderr ---\n", stderr)
                return
            }
            
            console.log(" --- executing s1.sh ---")
            
        }) 
        
    } catch(err) {
        console.error(" -> Oops, an error occured in SetUp()<TC>\n", err)
        return
    }

}