import {
  Module, VuexModule, Action, MutationAction,
  Mutation,
} from 'vuex-module-decorators';

import { v4 as uuidv4 } from 'uuid';

@Module({
  name: 'workflow',
  namespaced: true,
})
export default class WorkFlowState extends VuexModule {
  public triggerOptions: any[] = [];

  public actionOptions: any[] = [];

  public controlOptions: any[] = [];

  public workflowMap: Record<string, any> = {};

  public workflowTree: any = {};

  @MutationAction({
    rawError: true,
    mutate: ['workflowMap'],
  })
  async setupWorkflowMap() {
    const createTriggerUUID = uuidv4();
    const workflowMap = {
      [createTriggerUUID]: {
        uuid: createTriggerUUID,
        type: 'createTrigger',
        parent: null,
      },
    };
    return { workflowMap };
  }

  @MutationAction({
    rawError: true,
    mutate: ['triggerOptions'],
  })
  async setupTriggerOptions() {
    const triggerOptions = [
      {
        name: 'Upon registration of a workflow',
        type: 'trigger',
        properties: {},
      },
      {
        name: 'Upon completion of a workflow',
        type: 'trigger',
        properties: {},
      },
      {
        name: 'Upon completion of a form',
        type: 'trigger',
        properties: {},
      },
      {
        name: 'Upon completion of a lesson',
        type: 'trigger',
        properties: {},
      },
      {
        name: 'Upon a date',
        type: 'trigger',
        properties: {
          date: {
            uuid: '14',
            type: 'date',
            value: new Date().toISOString().substr(0, 10),
          },
          time: {
            uuid: '15',
            type: 'time',
            value: new Date().toISOString().substr(11, 5),
          },
        },
      },
    ];
    return { triggerOptions };
  }

  @MutationAction({
    rawError: true,
    mutate: ['actionOptions'],
  })
  async setupactionOptions() {
    const actionOptions = [
      {
        name: 'Complete Assessment',
        type: 'action',
        properties: {},
      },
      {
        name: 'Complete Learning Content',
        type: 'action',
        properties: {},
      },
      {
        name: 'Notify',
        type: 'action',
        properties: {
          user: {
            uuid: '10',
            type: 'array',
            options: [
              'Bob',
              'Frank',
            ],
            value: '',
          },
          message: {
            uuid: '11',
            type: 'string',
            value: '',
          },
        },
      },
      {
        name: 'Report',
        type: 'action',
        properties: {},
      },
      {
        name: 'Upon a date',
        type: 'action',
        properties: {
          date: {
            uuid: '14',
            type: 'date',
            value: new Date().toISOString().substr(0, 10),
          },
          time: {
            uuid: '15',
            type: 'time',
            value: new Date().toISOString().substr(11, 5),
          },
        },
      },
      {
        name: 'Download an image',
        type: 'action',
        properties: {
          source: {
            uuid: '13',
            type: 'string',
            value: '',
          },
        },
        return: {
          uuid: uuidv4(),
          type: 'image',
        },
      },
      {
        name: 'Detect a face',
        type: 'action',
        properties: {
          algorithm: {
            uuid: '12',
            type: 'array',
            options: [
              'Algorithm 1',
              'Algorithm 2',
            ],
            value: '',
          },
          output: {
            uuid: uuidv4(),
            type: 'array',
            options: [
              'identity',
              'coordinates',
            ],
            value: '',
          },
        },
        return: {

          type: 'Coordinates',
        },
      },
    ];
    return { actionOptions };
  }

  @MutationAction({
    rawError: true,
    mutate: ['controlOptions'],
  })
  async setupControlOptions() {
    const controlOptions = [
      {
        name: 'Condition',
        type: 'switch',
        properties: {
          if: {
            type: 'string',
            value: '',
          },
          condition: {
            type: 'array',
            options: [
              'is equal to',
              'is greater than',
              'is less than',
            ],
            value: '',
          },
          value: {
            type: 'string',
            value: '',
          },
        },
        switch: {
          val: 'name',
          cases: [
            {
              type: 'case',
              name: 'Yes',
            },
            {
              type: 'case',
              name: 'No',
            },
          ],
        },
      },
      {
        name: 'Do for each',
        type: 'for',
        for: {
          key: 'indentities',
        },
        properties: {},
      },
    ];
    return { controlOptions };
  }

  @Action({ rawError: true })
  async updateWorkflowTree() {
    const roots = [];
    // add empty children
    const workflowMapWithChildren: Record<string, any> = {};
    const forMap: any = {};

    for (const [uuid, node] of Object.entries(this.workflowMap)) {
      const workflowNodeWithChildren = JSON.parse(JSON.stringify(node));
      workflowNodeWithChildren.children = [];

      if (node.type === 'for') {
        workflowNodeWithChildren.for.children = [];
        forMap[node.for.uuid] = node;
      }

      workflowMapWithChildren[uuid] = workflowNodeWithChildren;
    }

    // add children/add roots
    // console.log({ forMap });
    for (const [uuid, node] of Object.entries(workflowMapWithChildren)) {
      if (node.parent !== null) {
        if (workflowMapWithChildren[node.parent] === undefined) {
          // if we can't find the parent in the map, the parent must be part of a
          // foreach loop
          const forNodeUUID = forMap[node.parent].uuid;
          // so get the for loop noode uuid and now search in the map
          workflowMapWithChildren[forNodeUUID].for.children.push(node);
        } else {
          workflowMapWithChildren[node.parent].children.push(node);
        }
      } else {
        roots.push(node);
      }
    }
    // console.log({ workflowMapWithChildren });
    // console.log({ roots });

    if (roots.length > 1) {
      throw new Error('More than one root node.');
    }
    this.SET_WORKFLOW_TREE(roots[0]);
  }

  @Action({ rawError: true })
  async addWorkflowAction({ element, nodeUUID }: any) {
    console.log(element);
    console.log(nodeUUID);
    const newStep = this.searchWorkflowTree({
      element: this.workflowTree,
      uuid: nodeUUID,
    });
    this.REPLACE_NEW_STEP_WITH_ACTION({
      newStep: newStep,
      newAction: element,
    });
  }

  @Mutation
  REPLACE_NEW_STEP_WITH_ACTION({ newStep, newAction }: any) {
    newStep = JSON.parse(JSON.stringify(newAction));
    console.log(newStep);
    console.log(this.workflowTree);
  }

  @Action({ rawError: true })
  searchWorkflowTree({ element, uuid }: any): any {
    if (element.uuid === uuid) {
      return element;
    }
    return this.searchWorkflowTree({
      element: element.next,
      uuid: uuid,
    });
  }

  @Action({ rawError: true })
  async addWorkflowElement({ workflowElement, newStepUUID }: any) {
    // console.log(workflowElement);
    // console.log(newStepUUID);
    // console.log(JSON.parse(JSON.stringify(this.workflowMap)));
    // console.log({ currentMap: JSON.parse(JSON.stringify(this.workflowMap)) });
    // console.log({ newStepUUID });
    const workflowElementNode = JSON.parse(JSON.stringify(workflowElement));
    workflowElementNode.uuid = uuidv4();
    workflowElementNode.parent = this.workflowMap[newStepUUID].parent;
    this.DELETE_WORKFLOW_ELEMENT_FROM_MAP(newStepUUID);
    // console.log({ workflowElementNode });
    if (workflowElement.type === 'for') {
      workflowElementNode.for.uuid = uuidv4();
      this.ADD_NEW_STEP_LEAF(workflowElementNode.for.uuid);
    }
    this.ADD_TO_WORKFLOW_MAP(workflowElementNode);
    // console.log(JSON.parse(JSON.stringify(this.workflowMap)));
    if (workflowElement.type === 'switch') {
      // console.log('ITERATING SWITCH CASES');
      for (const [index, switchCase] of workflowElement.switch.cases.entries()) {
        const newSwitchCase = JSON.parse(JSON.stringify(switchCase));
        newSwitchCase.uuid = uuidv4();
        newSwitchCase.parent = workflowElementNode.uuid;
        console.log(workflowElementNode);
        if (index === 0) {
          newSwitchCase.name = `if ${workflowElementNode.properties.if.value} ${workflowElementNode.properties.condition.value} ${workflowElementNode.properties.value.value}`;
        } else {
          newSwitchCase.name = 'else';
        }
        // console.log('ADDING SWITCH CASE');
        // console.log(newSwitchCase);
        this.ADD_TO_WORKFLOW_MAP(newSwitchCase);
        this.ADD_NEW_STEP_LEAF(newSwitchCase.uuid);
      }
    } else {
      // console.log('NOT SWITCH');
      this.ADD_NEW_STEP_LEAF(workflowElementNode.uuid);
    }
    // console.log(this.workflowMap);
    await this.updateWorkflowTree();
  }

  @Mutation
  SET_WORKFLOW_TREE(newWorkflowTree: any) {
    this.workflowTree = newWorkflowTree;
  }

  @Mutation
  SET_WORKFLOW_MAP(newWorkflowMap: any) {
    this.workflowMap = newWorkflowMap;
  }

  @Mutation
  DELETE_WORKFLOW_ELEMENT_FROM_MAP(nodeUUID: string) {
    delete this.workflowMap[nodeUUID];
  }

  @Mutation
  ADD_NEW_STEP_LEAF(parentUUID: string) {
    const newStepUUID = uuidv4();
    const newStep = {
      uuid: newStepUUID,
      type: 'newStep',
      parent: parentUUID,
    };
    this.workflowMap[newStepUUID] = newStep;
  }

  @Mutation
  ADD_TO_WORKFLOW_MAP(newNode: any) {
    this.workflowMap[newNode.uuid] = newNode;
  }

  @Action({ rawError: true })
  async setWorkflowTrigger(workflowTrigger: any) {
    workflowTrigger.uuid = uuidv4();
    workflowTrigger.parent = null;

    this.SET_WORKFLOW_MAP({
      [workflowTrigger.uuid]: workflowTrigger,
    });
    this.ADD_NEW_STEP_LEAF(workflowTrigger.uuid);

    await this.updateWorkflowTree();
  }

  @Action({ rawError: true })
  async getNullLeaves({ root, nullLeafAccumulator }: any): Promise<any> {
    if (root.children.length === 0) {
      return [root];
    }

    const nullLeaves = [];
    for (const child of root.children) {
      nullLeaves.push(...await this.getNullLeaves({
        root: child,
        nullLeafAccumulator: nullLeafAccumulator,
      }));
    }
    return nullLeaves;
  }
}
