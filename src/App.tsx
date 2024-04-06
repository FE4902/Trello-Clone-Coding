import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./Components/DragabbleCard";
import { useMemo } from "react";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 480px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
`;

const Boards = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
`;

const Board = styled.div`
    min-height: 200px;
    padding: 30px 20px 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.boardColor};
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;

        setToDos((oldToDos) => {
            const toDosCopy = [...oldToDos];

            // 1) Delete item on source.index
            toDosCopy.splice(source.index, 1);
            // 2) Put back the item on the destination.index
            toDosCopy.splice(destination?.index, 0, draggableId);

            return toDosCopy;
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
                <Boards>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Board
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
                            </Board>
                        )}
                    </Droppable>
                </Boards>
            </Wrapper>
        </DragDropContext>
    );
}

export default App;
