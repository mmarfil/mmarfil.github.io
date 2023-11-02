---
title: "Quick access to iCloud Keychain"
date: "2022-02-20 22:58 America/Sao_Paulo"
image: "og.png"
---

Since Apple introduced verification codes support to iOS and macOS last year, I’ve been using iCloud Keychain as my password manager.

Admittedly, it was not an easy transition coming from 1Password. The lack of dedicated app on the iPhone, and equivalent shortcut to 1Password’s `⌥` `⌘` + `\` on the Mac proved to be a challenge at first — **but**, the battle wasn’t lost!

### Shortcuts app to the rescue

As a huge Shortcuts app enthusiast, I soon realized I could circumvent this annoyance with a couple workarounds. With just a few actions, I was able to come up with [this shortcut](https://www.icloud.com/shortcuts/010c9b5c8ba942478b19828586d8484c) that works on both OSes smoothly.

￼<span class="image-container"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/2022-02-20/shortcut-actions.png#shadow" alt="Shortcut actions"></span>

Basically, depending on what OS the shortcut is triggered from, a different action is performed to quickly open iCloud Passwords from either Settings or System Preferences apps.

### Creating a fake “app” on iOS

Now with the shortcut done and working, I needed an app launcher to place on my Home Screen.

￼<span class="image-container"><img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/2022-02-20/homescreen.png#shadow" alt="Passwords custom icon"></span>

To create an app launcher, open the “Passwords” shortcut; tap the “Shortcut Details” toolbar button (next to “×” button); tap the “Add to Home Screen” option; and lastly, tap the icon container preview if you'd like to use a custom image.

Though, you can grab the icon I designed [here]({{ site.url }}{{ site.baseurl }}/assets/images/posts/2022-02-20/passwords-icon.png).

### Setting up a global shortcut on macOS

On the Mac, the process is similar but rather than creating an app launcher, I have set up a global shortcut for it.

To do that, you can click the “Shortcut Details” toolbar button at top right of the shorcut detail view; then check “Use as Quick Action”; and lastly, in the “Run with:” section, type the shortcut you want to use it with. I for one use `⌃` `⌥` `⌘` + `P`.

And that should do it — Happy passwording!
