import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { BookCard, DeleteShelfModal, ManageBookshelfModal} from ".";

// import { EditShelfModal } from "./EditShelfModal";
// import { ManageBookshelfModal } from "./ManageBookshelfModal";


const HomeLibrary = ({
  library,
  books,
  onlyImage = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  return (
    <Box mt={2} borderBottom="1px solid rgb(217,217,217)">
      <DeleteShelfModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} />
      {/* <EditShelfModal
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        id={id}
        name={library}
      /> */}
      <ManageBookshelfModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        id={id}
        name={library}
        
      />
      <Flex justifyContent="space-between">
        <Flex w={"90%"} alignItems="center">
          <Text
            m="0 0"
            color="#4e4c4a"
            fontSize="1.25rem"
            fontWeight="bold"
            lineHeight="1.875rem"
            pb="1rem"
            mr="0.4rem"
          >
            {library} ({books?.length || 0})
          </Text>
          {id && (
            <Menu>
              <MenuButton>
                <Text
                  m="0 0"
                  color="#4e4c4a"
                  fontSize="1.25rem"
                  fontWeight="bold"
                  lineHeight="1.875rem"
                >
                  ...
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setAddOpen(true)}>
                  Manage Books
                </MenuItem>
                {/* <MenuItem onClick={() => setEditOpen(true)}>Update</MenuItem> */}
                <MenuItem onClick={() => setIsOpen(true)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
      <Flex
        justifyContent={onlyImage ? "flex-start" : "space-between"}
        flexWrap="wrap"
      >
        {books &&
          books?.map((x) => {
            return (
              <BookCard
                key={x.book._id}
                onlyImage={onlyImage}
                ISBN10={x.book.ISBN10}
                imageUrl={x.book.thumbnail}
                status={x.status}
                favorited={x.favorited}
                title={x.book.title}
                author={x.book.authors.length && x.book.authors[0].name}
                rating={x.book.average_rating}
                userBookId={x._id}
                // id={x.book._id}
                // bookInfo={x}
              />
            );
          })}
      </Flex>
    </Box>
  );
};

export default HomeLibrary