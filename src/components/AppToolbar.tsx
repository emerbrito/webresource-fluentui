import {
  SaveRegular,
  SaveArrowRightRegular,
  DeleteRegular,
  ArrowLeftRegular,
  MoreVertical24Filled,
  AddRegular
} from '@fluentui/react-icons'

import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  ToolbarProps
} from '@fluentui/react-components'

export const AppToolbar = (props: Partial<ToolbarProps>) => {
  return (
    <Toolbar aria-label='Default' {...props}>
      <ToolbarButton aria-label='Go back' icon={<ArrowLeftRegular />} />
      <ToolbarDivider />
      <ToolbarButton aria-label='Add new record' icon={<AddRegular />}>
        Add New
      </ToolbarButton>
      <ToolbarButton aria-label='Save record' icon={<SaveRegular />}>
        Save
      </ToolbarButton>
      <ToolbarButton aria-label='Save and close' icon={<SaveArrowRightRegular />}>
        Save & Close
      </ToolbarButton>
      <ToolbarButton aria-label='Delete record' icon={<DeleteRegular />}>
        Delete
      </ToolbarButton>

      <Menu>
        <MenuTrigger>
          <ToolbarButton aria-label='More' icon={<MoreVertical24Filled />} />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New </MenuItem>
            <MenuItem>New Window</MenuItem>
            <MenuItem disabled>Open File</MenuItem>
            <MenuItem>Open Folder</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Toolbar>
  )
}
