Treeview Snippets Key Files

HTML Files:



treeview_table_interaction.html 		(FINAL WORKING SOLUTION FOR PORTING TO BFI)
|
—treeview.css
|
—interactive_dynamic_treeview.js
	|
	—treeview.json
—tableJSONfilterByInputViaTreeView.js
	|
	—shiptable.json
	OR
	|
	—tableData.json

NOTES:

.json files (FOR THE TABLE PART) can be swapped out as long as they include searchable fields (UnitType, SubType, Class) table header fields (ID, Name).

Other fields within records will be renders as best as possible. For example, nested monthly events under “MonthlyStatus” in shiptable.json appear simply as objects. A different table rendering script is needed to parse those as their own nested fields. This script already exists in the BFI prototype project)



dynamic_tree_withTable_index.html
|
—treeview.css
|
—dynamic_treeview.js
	|
	—treeview.json

NOTES: 

Very basic searchable treeView search prototype. Builds tree data from datain treeview.json. Resultant table is hardcoded HTML. TABLE IS NOT DYNAMIC (IE it’s not searchable) This combination simply demostrates the ability to create a treewview, with an optional text input, collect the selected or type criteria into a varable and displays the variable in a modal alert

Uses treeview.css to format the results into a clean looking HTML page



dynamic_treeview_index.html

Same as above, but there is no table included.


treeview_index.html

Uses same files as previous examples, but no interaction with the treeView itself. IE the tree does not expand when the arrows are click. PROBABLY NOT USEFUL as a dynamic protoype. Might be useful as an HTML skeleton for future unrelated treeView designs.


treeview.html

NOT COMPLETE HTML DOCUMENT!!! This was the starting point. It is s simple, hardcoded <UL> the CARET and PLUS SIGN characters included. HAS NO INTERACTIONS. HAS NO DYNAMIC DATA. Useful only as as starting point for similar treeview prototypes to be inserted with their own .CSS and JAVASCRIPT to create other treeview solutions.



tableTester.html 
|
—tableJSONfilterByInput.js


NOTES:
— standalone file to render test. Uses an input box for search criteria. 
—uses tableJSONfilterByInput.js
— uses tableData.json but that could easily be swapped out
— USEFUL AS BASIC TEMPLATE FOR SEARCHABLE TABLE




Unused files:

treeview.js 

— basic example of loading interactive treeview from .json file and rendering tree in HTML


createTableFromJSON.js

— copied over from BFI prototype to test with the treeview functions developed here.

tableFilter.js

—early prototype to link treeview to table? NOT DELETED BECAUSE I DON’T KNOW IF IT MIGHT NOT BE USEFUL BUT I DON’T SEE IT USED ANYWHERE AT THE MOMENT.
