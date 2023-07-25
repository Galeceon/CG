These were my attempts at the challenges proposed. As I said during the interview, React isn't really my forte, but still I tried my best to make the water jug challenge work.
But it didn't still, I'll write about my progress and why I used every function.
For the water jug function, it's meant to set variables for the quantity of water and the different states each bucket can be in, as well as the condition to exit the program, using states to handle most of the data in this function.
I tried with the approach of doing both runs, each following a pattern (pattern 1 being Filling A, A to B, emptying B, A to B and repeat, pattern 2 being the opposite), but some difficulties made the program not work as intended, sometimes returning up to a thousand steps.
calculateSteps is where most of the heavy lifting is done, using the .push function to implement these routings with some validations not to go over 1000 attempts in these routes.
After these two routes were done, it'd return the shortest one by comparing them, or that was the intended plan.
The return portion of the code was the one in charge of writing down every step and showing it in the webpage.

Additionally, I added another file (src/components/WaterJug2.tsx) as this was one of my first attempts while still going over the React framework, the logic wasn't as well implemented, but you can see and run the program with the problems mentioned above.
These can be switched by modifying App.tsx (src/App.tsx) and altering line 1 from import WaterJug from "./components/WaterJug" to import WaterJug from "./components/WaterJug2";

This one is well noted in spanish, but it's still mostly the same. It's main difference is how .push is used more often to handle the function of the buckets.


Regarding the mockup page, I tried my best to do one as similar as possible, but because finals were coming up, I was unlucky enough to not have enough time to 100% study every single possibility via React, but I didn't want to present you a visually uninteresting project.
There are some caveats with this design I made, mainly it is done via CSS and HTML, and the container div has images instead of hard elements (objects, images, titles, lorem ipsum), but I believe I followed the rest of the instructions as best as I could.
For the colors of the webpage, I utilized image editing software like Photoshop to extract the colors and use them in my own design, and I ended up editing some of the icons on my own to fit my needs, image editing is something I really enjoy.
There are some dark-ish lines in the middle section of the main container, surrounding the images inside it.


I hope they're good enough for your liking and consideration, I'd really value the experience of working under your care.
