import React from "react";

const ProjectTag = ({ name, onClick, isSelected }) => {
    return (
        <button
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isSelected
                    ? 'bg-accent-primary text-background-primary'
                    : 'text-text-secondary border border-border-subtle hover:border-border-hover hover:text-text-primary'
            }`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    );
};

export default ProjectTag;
