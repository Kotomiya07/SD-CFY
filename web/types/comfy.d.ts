import { LGraphNode, IWidget } from "./litegraph";
import { sdcfyApp } from "../../scripts/app";

export interface sdcfyExtension {
	/**
	 * The name of the extension
	 */
	name: string;
	/**
	 * Allows any initialisation, e.g. loading resources. Called after the canvas is created but before nodes are added
	 * @param app The SD-CFY app instance
	 */
	init(app: sdcfyApp): Promise<void>;
	/**
	 * Allows any additonal setup, called after the application is fully set up and running
	 * @param app The SD-CFY app instance
	 */
	setup(app: sdcfyApp): Promise<void>;
	/**
	 * Called before nodes are registered with the graph
	 * @param defs The collection of node definitions, add custom ones or edit existing ones
	 * @param app The SD-CFY app instance
	 */
	addCustomNodeDefs(defs: Record<string, sdcfyObjectInfo>, app: sdcfyApp): Promise<void>;
	/**
	 * Allows the extension to add custom widgets
	 * @param app The SD-CFY app instance
	 * @returns An array of {[widget name]: widget data}
	 */
	getCustomWidgets(
		app: sdcfyApp
	): Promise<
		Record<string, (node, inputName, inputData, app) => { widget?: IWidget; minWidth?: number; minHeight?: number }>
	>;
	/**
	 * Allows the extension to add additional handling to the node before it is registered with LGraph
	 * @param nodeType The node class (not an instance)
	 * @param nodeData The original node object info config object
	 * @param app The SD-CFY app instance
	 */
	beforeRegisterNodeDef(nodeType: typeof LGraphNode, nodeData: sdcfyObjectInfo, app: sdcfyApp): Promise<void>;
	/**
	 * Allows the extension to register additional nodes with LGraph after standard nodes are added
	 * @param app The SD-CFY app instance
	 */
	registerCustomNodes(app: sdcfyApp): Promise<void>;
	/**
	 * Allows the extension to modify a node that has been reloaded onto the graph.
	 * If you break something in the backend and want to patch workflows in the frontend
	 * This is the place to do this
	 * @param node The node that has been loaded
	 * @param app The SD-CFY app instance
	 */
	loadedGraphNode(node: LGraphNode, app: sdcfyApp);
	/**
	 * Allows the extension to run code after the constructor of the node
	 * @param node The node that has been created
	 * @param app The SD-CFY app instance
	 */
	nodeCreated(node: LGraphNode, app: sdcfyApp);
}

export type sdcfyObjectInfo = {
	name: string;
	display_name?: string;
	description?: string;
	category: string;
	input?: {
		required?: Record<string, sdcfyObjectInfoConfig>;
		optional?: Record<string, sdcfyObjectInfoConfig>;
	};
	output?: string[];
	output_name: string[];
};

export type sdcfyObjectInfoConfig = [string | any[]] | [string | any[], any];
