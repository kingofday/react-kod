import React, { useState } from "react";
import Modal from "../../src/components/Modal";
import type { Meta, StoryObj } from '@storybook/react';
import Button from "../../src/components/Button";

const meta: Meta<typeof Modal> = {
    title: "/modal",
    component: Modal
};
export default meta;
type Story = StoryObj<typeof Modal>;
export const DefaultModal: Story = {
    render: () => {
        const [isOpen,toggleModal] = useState(false);
        const handleOpen = (e:any)=>{
            e.stopPropagation();
            toggleModal(true)
        }
        return <>
        <Button onClick={handleOpen}>Show</Button>
        <Modal open={isOpen} title={"some title"} titleIcon={"$"} onClose={()=>toggleModal(false)}>
            Some content
        </Modal>
        </>
    },
};      
export const FullScreenModal: Story = {
    render: () => {
        const [isOpen,toggleModal] = useState(false);
        const handleOpen = (e:any)=>{
            e.stopPropagation();
            toggleModal(true)
        }
        return <>
        <Button onClick={handleOpen}>Show</Button>
        <Modal open={isOpen} title={"some title"} titleIcon={"$"} fullscreen onClose={()=>toggleModal(false)}>
            Full screen mode content
        </Modal>
        </>
    },
};