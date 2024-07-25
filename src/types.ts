export type TODO = {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: string;
};

export type Container = {
  todos: TODO[];
  id: string;
  moveChild: (arg0: string, arg1: string, arg2: string) => void;
};
