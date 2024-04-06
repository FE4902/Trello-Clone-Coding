import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

const Wrapper = styled.div`
    min-height: 200px;
    padding: 30px 20px 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => (
                        <DragabbleCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {magic.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}
