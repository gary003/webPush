const publicVapidKey = "BI54aD1IHv1ZVK_3HafrXMeSQF-nBhrTnsZEJParg6s0PIgP888RrkYcqvL0kTEc5yi33XJI86p8Q9eZtPi1V3o"

let register = null
let subscription = null

addEventListener("load", async () => {
  if (!"serviceWorker" in navigator) {
    return new Error("No service worker available, please try an other browser for notifications.")
  }

  console.log("registering SW")
  register = await navigator.serviceWorker.register("/worker.js", { scope: "/" }).catch((err) => console.error(err))
  console.log("serviceworker registered")

  //register push
  console.log("registering push")
  subscription = await register.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey
    })
    .catch((err) => console.error(err))
  console.log("push registered")
  console.log(subscription)
})

const notifications = async () => {
  if (!"serviceWorker" in navigator) {
    return new Error("No service worker available, please try an other browser for notifications.")
  }

  // fetching the app push route
  console.log("pushing notification ")
  await fetch("notifications", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  }).catch((err) => console.error(err))
  console.log("push sent")

  return true
}
