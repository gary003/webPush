const publicVapidKey = "BI54aD1IHv1ZVK_3HafrXMeSQF-nBhrTnsZEJParg6s0PIgP888RrkYcqvL0kTEc5yi33XJI86p8Q9eZtPi1V3o"

//register SW, register Push, send Push
const send = async () => {
  console.log("registering SW")

  const register = await navigator.serviceWorker.register("/worker.js", { scope: "/" })

  console.log("serviceworker registered")

  //register push
  console.log("registering push")
  const subscription = await register.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey
    })
    .catch((err) => console.error(err))
  console.log("push registered")

  console.log("sending push")

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  })

  console.log("push sent")
}

if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err))
}

// addEventListener("load", async () => {
//   let sw = await navigator.serviceWorker.register("./sw.js")
//   console.log(sw)
// })

// const subscribe = async () => {
//   let sw = await navigator.serviceWorker.ready
//   let push = await sw.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: "BI54aD1IHv1ZVK_3HafrXMeSQF-nBhrTnsZEJParg6s0PIgP888RrkYcqvL0kTEc5yi33XJI86p8Q9eZtPi1V3o"
//   })
//   console.log(JSON.stringify(push))
// }
