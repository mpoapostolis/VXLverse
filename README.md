# VXLverse

VXLverse distinguishes itself as a robust WebGL editor, specifically engineered for crafting engaging 3D story games. It comes equipped with advanced features that enable the development of immersive narratives, including the facilitation of quest creation and the integration of Non-Player Characters (NPCs). This makes VXLverse not just a tool for building 3D environments, but a comprehensive platform for breathing life into those environments with interactive and captivating stories.





# Features

- Intuitive drag-and-drop interface for placing and manipulating 3D objects
- Comprehensive library of customizable meshes, materials, and textures
- Built-in transformation tools for scaling, rotating, and moving objects
- Export and import 3D scene files for seamless collaboration and sharing
- Create multiple quest at npcs and create a story game

# Live Demo

Try out [**VXLverse**](http://vxlverse.com/) for yourself

1.  To add a 3D object to your scene, click on the "Nodes" -> RPG Entity button and select a mesh from the drop-down menu.

2.  Once the object is added, you can manipulate it using the transformation tools provided:
   - To move the object, click and drag it to the desired position within the grid.
   - To rotate the object, click on the "Rotate" tool and drag the rotation handles.
   - To scale the object, click on the "Scale" tool and drag the scaling handles.

3.  To add a material to your object, click on the "Materials" tab in the Inspector and choose a material from the list. Then, click on the object to apply the material.

4.  You can continue adding objects and materials to build your 3D scene.

5.  To save your work, click on the "Export" button to download the scene as a JSON file. You can also import a previously saved JSON file by clicking the "Import" button and selecting the file from your computer.

6.  If you need to delete a node, Select the node and press Delete .



Remember to experiment with different nodes, materials, and transformations to create unique and immersive 3D scenes. The intuitive interface and powerful features of VXLverse make it easy for users of all skill levels to design and share their creations.

# Quest Creation Guide

This guide explains how to create a quest using the Quest Editor in our platform.


1) Select a node in your workspace where you would like to create your quest.

 
2) Open the Quest Editor  In the Inspector Bar on the side, select the **Quest Editor**.

3)  Create a Quest Click on the "Create New Quest" button.

4) Edit the Quest Fields
Fill in the fields with relevant details about your quest. Here's what each field represents:

   * Name  This is the name of your quest. It should be unique and descriptive to help differentiate it from other quests. 

   * Initial Dialogue This is the dialogue that the Non-Player Character (NPC) tells the player when the hero interacts with it for the first time.

   *  Required Item to Complete This is an optional field. If specified, it represents an item that the player needs to have in their inventory for the quest to be marked as completed.

   * Quest Complete Dialogue This is the dialogue that the NPC tells the player when they bring the required item back to them.

   * Reward This is an optional field. If specified, this represents a reward that the player will receive in their inventory upon completion of the quest.
Remember, the 'Required Item to Complete', 'Quest Complete Dialogue', and 'Reward' fields are all optional and can be left blank if not applicable to your quest.

That's all you need to create a quest! Once you're done, don't forget to save your work. Happy questing!


## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
```
git clone <https://github.com/mpoapostolis/VXLverse.git>
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run start
```


4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Contributing

We welcome contributions from the community. Please submit your
changes via pull requests, and we will review and merge them as appropriate.


# Instructions for Use

1. To add a 3D object to your scene, navigate to "Nodes" -> RPG Entity button and select a mesh from the drop-down menu.

2. Once the object is added, you can manipulate it using the transformation tools provided:
   - To move the object, click and drag it to the desired position within the grid.
   - To rotate the object, select the "Rotate" tool and drag the rotation handles.
   - To scale the object, select the "Scale" tool and drag the scaling handles.

3. To add a material to your object, click on the "Materials" tab in the Inspector and choose a material from the list. Then, click on the object to apply the material.

4. Continue adding objects and materials to build your 3D scene.

5. To save your work, click on the "Export" button to download the scene as a JSON file. You can also import a previously saved JSON file by clicking the "Import" button and selecting the file from your computer.

6. If you need to delete a node, select the node and press Delete.

Explore different nodes, materials, and transformations to create unique and immersive 3D scenes. The intuitive interface and powerful features of VXLverse make it easy for users of all skill levels to design and share their creations.

# Quest Creation Guide

This guide explains how to create a quest using the Quest Editor in VXLverse.

1. Select a node in your workspace where you would like to create your quest.

2. Open the Quest Editor in the Inspector Bar on the side, select the **Quest Editor**.

3. Click on the "Create New Quest" button.

4. Fill in the fields with relevant details about your quest. Here's what each field represents:
   - Name: The unique and descriptive name of your quest.
   - Initial Dialogue: The dialogue that the Non-Player Character (NPC) will say to the player when first interacted with.
   - Required Item to Complete: (Optional) An item that the player must have in their inventory for the quest to be marked as completed.
   - Quest Complete Dialogue: The dialogue that the NPC will tell the player when they bring the required item back to them.
   - Reward: (Optional) A reward that the player will receive in their inventory upon completion of the quest.
   
Remember, the 'Required Item to Complete', 'Quest Complete Dialogue', and 'Reward' fields are optional and can be left blank if they do not apply to your quest.

Save your work once you're done. Happy questing!

# Getting Started Locally

To set up the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/mpoapostolis/VXLverse.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run start
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.



# Roadmap
You can see the roadmap
 [here](https://github.com/users/mpoapostolis/projects/2/views/1)


# Contributing

We welcome contributions from the community. Please submit your changes via pull requests, and we will review and merge them as appropriate.



