self.addEventListener("push", () => {
  self.registration.sendNotification("text", {})
})
