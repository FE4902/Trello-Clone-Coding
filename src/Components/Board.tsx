import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 300px;
    padding: 10px 0;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

const Title = styled.h2`
    margin-bottom: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
    flex-grow: 1;
    padding: 20px;
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
            ? "#b2bec3"
            : "#74b9ff"};
    transition: 0.3s ease-in-out;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DragabbleCard
                                key={toDo}
                                index={index}
                                toDo={toDo}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}
