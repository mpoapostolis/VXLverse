# VXLverse

VXLverse is an intuitive WebGL-based editor designed for the creation of 3D story games. It's a comprehensive platform that bridges the gap between game development and storytelling, providing users with a suite of tools to craft immersive narratives within dynamic three-dimensional environments.

## Key Features

- **Drag-and-Drop Interface:** At the heart of VXLverse is an intuitive interface that allows for the placement and manipulation of 3D objects within the scene, akin to interactive digital architecture. This interface makes scene construction as simple as clicking and dragging objects into place.

- **Customizable Asset Library:** VXLverse provides a comprehensive library of 3D assets, including customizable meshes, materials, and textures. These assets can be tailored to your specifications, offering vast creative flexibility when designing your scenes.

- **Transformation Tools:** VXLverse features built-in tools for object transformation. These allow for the scaling, rotation, and relocation of objects, facilitating precise control over scene composition.

- **Import and Export Functionality:** Collaborative design and sharing are made easy with VXLverse. The platform supports the export and import of 3D scene files, enabling seamless cooperation between users and facilitating the distribution of your creations.

- **Quest Creation & NPCs:** Beyond environmental design, VXLverse integrates narrative elements with its quest creation feature. This allows users to breathe life into their 3D scenes, incorporating Non-Player Characters (NPCs) and crafting engaging storylines complete with dialogues and tasks.

## How to Get Started

Try out [**demo**](http://vxlverse.com/) 


- **Adding 3D Assets:** Start by populating your scene with 3D objects. Click on the "Nodes" -> "RPG Entity" button and select a mesh from the drop-down menu.

- **Manipulating Objects:** Once an object is placed, you can move it, rotate it, or adjust its size using the available transformation tools. 

- **Applying Materials:** For more customization, apply different materials to your objects. Navigate to the "Materials" tab in the Inspector and select a material. Click on the object to apply your selection.

- **Saving and Sharing Your Work:** VXLverse provides functionality to save your progress and share your work. Export your scene as a JSON file for easy distribution and future editing. Importing a previously saved scene is as simple as uploading the corresponding JSON file.

- **Creating a Story:** Make your game interactive by adding quests and NPCs. Select a node in your scene and open the Quest Editor in the Inspector Bar. Fill in the relevant fields to set the quest's name and initial dialogue. 

VXLverse is designed to make the process of creating 3D story games accessible and engaging, whether you're a hobbyist game designer or a professional developer. Enjoy the flexibility of our tools and bring your stories to life in a vibrant 3D world.

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



# Roadmap
You can see the roadmap
 [here](https://github.com/users/mpoapostolis/projects/2/views/1)


# Contributing

We welcome contributions from the community. Please submit your changes via pull requests, and we will review and merge them as appropriate.



