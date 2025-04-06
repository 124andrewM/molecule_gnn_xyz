# Adjacency Matrix

## Info

Given a file containing a molecule with each atom's x,y,z coordinates, the following creates an adjacency matrix for the molecules.

## Usage

The data folder has been ignored in this repo, so please feel free to use it for your calculations.

### convertMoleculeToMatrix.js

This will output to console

```
node convertMoleculeToMatrix.js /path/to/file.txt
```

### convertFolder.sh

This will output each file to a new file with the files name + AM (e.g. dsgdb9nsd_130001.txt become dsgdb9nsd_130001AM.txt) in the same folder

```
bash convertFolder /path/to/targetFolder
```
