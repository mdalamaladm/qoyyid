import BodyChildNode from "@/utils/markdown/v1/parser/nodes/BodyChildNode";
import BodyNode from "@/utils/markdown/v1/parser/nodes/BodyNode";
import ListNode from "@/utils/markdown/v1/parser/nodes/ListNode";
import Node from "@/utils/markdown/v1/parser/nodes/Node";

type MarkdownNode = Node & ListNode & BodyChildNode & BodyNode
