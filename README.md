# WaiBirth - A bot de discord that alerts you when your waifu is birthday uwu

## Technologys

* The bot is written entirely with Typescript and the discord.js library using 
object-oriented programming and decorators with the help of the @typeit/discord library.

* By default it is configured to use Firebase Realtime Database as the database.

## Configuration

* The configuration must be done in an .env file in .env.example this is an example of what fields the configuration should take.

* By default the use of elementary commands is blocked for the user you configure in the environment variable USER_ID,
if you want this to be the case, you must comment the Guard decorator of the commands that you do not want to protect.

* firebase variables are also set in .env file.

## Commands

the commands are by default configured to use the prefix ">". if you want to change this you can go to the 
HappyBirthdayWaifu.ts class and change the prefix assigned in the @Discord (">") decorator.

when adding mentions at the end of the command to add birthdays on the birthday, the waifu will mention those people added.

* Add birthdays
  >add <name> <lastname> <day/month> <url> @mention user interested.
  
  Example: >add Sakura Kinomoto 1/4 www.url.com/img.png @Juanito

* View birthday information
  >birth <name> <lastname>
  
* Edit birthday
  >edit <ID> <name> <lastname> <day/month> <url> @mention user interested
  
* Remove birthday
  >rm <ID>
  
* Birthday list
  >list
  *birthday lists show ids that allow you to edit and delete*
  
## Warnings

This bot does not have methods to manage unique fields in the database, it is the responsibility of whoever uses it to organize the information.

