import { styled } from "styled-components";
import { FullBtn, FullRedBtn } from "../../common/Btns";
import { useContext } from "react";
import { EditContext } from "../../../contexts/EditContext";
import { deleteData } from "../../../services/api";
const FieldDocumentBlock = ({
  setDatas,
  children,
  fieldName,
  documentId,
  isDocumentEditing,
  setIsDocumentEditing,
}) => {
  const { isEditing } = useContext(EditContext);
  const handleDeleteDocument = async (e) => {
    e.preventDefault();
    //field context 다가져오거나 할 것.
    try {
      console.log(`${fieldName}의 ${documentId} 삭제 함수 실행`);
      await deleteData(documentId, fieldName);

      setDatas((documents) => {
        const updatedDocuments = documents.filter(
          (item) => item._id !== documentId
        );
        return updatedDocuments;
      });
    } catch (error) {
      console.log("삭제 실패:", error);
    }
  };

  return (
    <Block key={documentId}>
      <div className="data">{children}</div>
      {isEditing && (
        <div className="btns">
          {isDocumentEditing || (
            <>
              <FullBtn
                onClick={() => {
                  setIsDocumentEditing(true);
                }}
              >
                수정
              </FullBtn>
              <FullRedBtn onClick={handleDeleteDocument}>삭제</FullRedBtn>
            </>
          )}
        </div>
      )}
    </Block>
  );
};

export default FieldDocumentBlock;

const Block = styled.div`
  border: solid 2px black;
  border-radius: 8px;
  margin: 10px 20px;
  display: flex;
  position: relative;
  padding: 5px 10px;
  .btns {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    button {
      height: 50px;
      margin-right: 20px;
    }
  }
`;
